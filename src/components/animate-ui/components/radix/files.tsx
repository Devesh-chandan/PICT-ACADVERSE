import React, { createContext, useContext, useState } from "react";
import { ChevronRight, ChevronDown, Folder, File, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Context for Tree State ---
type FilesContextType = {
  openFolders: string[];
  toggleFolder: (value: string) => void;
};

const FilesContext = createContext<FilesContextType | undefined>(undefined);

// --- Root Component ---
interface FilesProps {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: string[];
}

export const Files = ({ children, className, defaultOpen = [] }: FilesProps) => {
  const [openFolders, setOpenFolders] = useState<string[]>(defaultOpen);

  const toggleFolder = (value: string) => {
    setOpenFolders((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <FilesContext.Provider value={{ openFolders, toggleFolder }}>
      <div className={cn("font-mono text-sm", className)}>
        {children}
      </div>
    </FilesContext.Provider>
  );
};

// --- SubFiles (Indentation Wrapper) ---
interface SubFilesProps {
  children: React.ReactNode;
  defaultOpen?: string[];
}

export const SubFiles = ({ children }: SubFilesProps) => {
  return (
    <div className="pl-4 border-l border-border/40 ml-2.5">
      {children}
    </div>
  );
};

// --- Folder Item ---
interface FolderItemProps {
  value: string;
  children: React.ReactNode;
}

const FolderItemSimple = ({ value, children }: FolderItemProps) => {
  return <div className="flex flex-col">{children}</div>;
};

// --- Folder Trigger ---
interface FolderTriggerProps {
  children: React.ReactNode;
  className?: string;
  gitStatus?: "modified" | "untracked" | "deleted" | "ignored";
  onClick?: () => void;
}

export const FolderTrigger = ({ children, className, gitStatus, onClick }: FolderTriggerProps) => {
  // We need to access the parent FolderItem's value somehow. 
  // actually, the structure implies strict nesting. 
  // To keep it simple matching the user's API, we will assume standard usage.
  // BUT the check for "isOpen" needs the value.
  // The user's API wraps Trigger and Content in Item.
  // So we probably need a Context for the FolderItem too?
  // Let's rely on the user passing `value` to `FolderItem` and Context.

  // Actually, in the user's example:
  // <FolderItem value="app">
  //   <FolderTrigger>app</FolderTrigger>
  //   <FolderContent>...</FolderContent>
  // </FolderItem>

  // So FolderItem needs to provide its value to its children.
  return <FolderTriggerInternal className={className} gitStatus={gitStatus} onClick={onClick}>{children}</FolderTriggerInternal>;
};

// Helper to access FolderItem context
const FolderItemContext = createContext<{ value: string } | undefined>(undefined);

const FolderTriggerInternal = ({ children, className, gitStatus, onClick }: FolderTriggerProps) => {
  const fileContext = useContext(FilesContext);
  const itemContext = useContext(FolderItemContext);

  if (!fileContext || !itemContext) {
    throw new Error("FolderTrigger must be used within Files and FolderItem");
  }

  const isOpen = fileContext.openFolders.includes(itemContext.value);

  const handleClick = () => {
    fileContext.toggleFolder(itemContext.value);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-1.5 w-full hover:bg-muted/50 py-1 px-2 rounded-md transition-colors text-left",
        className
      )}
    >
      <span className="opacity-70">
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </span>
      <span className="text-blue-400">
        {isOpen ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
      </span>
      <span className="flex-1 truncate">{children}</span>
      {gitStatus && <GitStatusIndicator status={gitStatus} />}
    </button>
  );
};

// --- Folder Content ---
interface FolderContentProps {
  children: React.ReactNode;
}

export const FolderContent = ({ children }: FolderContentProps) => {
  const fileContext = useContext(FilesContext);
  const itemContext = useContext(FolderItemContext);

  if (!fileContext || !itemContext) return null;

  const isOpen = fileContext.openFolders.includes(itemContext.value);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Wrapper for FolderItem to provide Context
const FolderItemWrapper = ({ value, children }: FolderItemProps) => {
  return (
    <FolderItemContext.Provider value={{ value }}>
      <div className="flex flex-col">{children}</div>
    </FolderItemContext.Provider>
  );
};

// Export the wrapper as FolderItem
export { FolderItemWrapper as FolderItem };


// --- File Item ---
interface FileItemProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ElementType;
  gitStatus?: "modified" | "untracked" | "deleted" | "ignored";
  onClick?: () => void;
  active?: boolean;
}

export const FileItem = ({ children, className, icon: Icon, gitStatus, onClick, active }: FileItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 w-full hover:bg-muted/50 py-1 px-8 rounded-md transition-colors text-left text-muted-foreground hover:text-foreground",
        active && "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
        className
      )}
    >
      {Icon ? <Icon className="w-4 h-4 shrink-0" /> : <File className="w-4 h-4 shrink-0 opacity-70" />}
      <span className="truncate flex-1">{children}</span>
      {gitStatus && <GitStatusIndicator status={gitStatus} />}
    </button>
  );
};


// --- Git Status Indicator ---
const GitStatusIndicator = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    modified: "text-yellow-500",
    untracked: "text-green-500",
    deleted: "text-red-500",
    ignored: "text-muted-foreground",
  };

  const labels: Record<string, string> = {
    modified: "M",
    untracked: "U",
    deleted: "D",
    ignored: "I"
  };

  return (
    <span className={cn("text-[10px] font-bold px-1.5", colors[status])}>
      {labels[status]}
    </span>
  );
};
