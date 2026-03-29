import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FlaskConical, 
  Code, 
  MessageSquare,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  BookOpen
} from "lucide-react";

const labSubjects = ["DSA Lab", "DBMS Lab", "OS Lab", "CN Lab"];

const labExperiments = {
  "DSA Lab": [
    {
      id: 1,
      title: "Implement Stack using Array",
      aim: "To implement stack data structure using array and demonstrate push, pop, and display operations.",
      code: `#include <stdio.h>
#define MAX 100

int stack[MAX], top = -1;

void push(int val) {
    if (top >= MAX - 1)
        printf("Stack Overflow\\n");
    else
        stack[++top] = val;
}

int pop() {
    if (top < 0) {
        printf("Stack Underflow\\n");
        return -1;
    }
    return stack[top--];
}

void display() {
    if (top < 0)
        printf("Stack is empty\\n");
    else {
        printf("Stack elements: ");
        for (int i = top; i >= 0; i--)
            printf("%d ", stack[i]);
        printf("\\n");
    }
}

int main() {
    push(10);
    push(20);
    push(30);
    display();
    printf("Popped: %d\\n", pop());
    display();
    return 0;
}`,
      output: "Stack elements: 30 20 10\nPopped: 30\nStack elements: 20 10",
      vivaQuestions: [
        { q: "What is LIFO?", a: "LIFO stands for Last In First Out. It means the element inserted last will be removed first." },
        { q: "What is stack overflow?", a: "Stack overflow occurs when we try to push an element into a full stack." },
        { q: "Applications of stack?", a: "Function calls, expression evaluation, undo operations, browser history." },
      ],
    },
    {
      id: 2,
      title: "Implement Binary Search Tree",
      aim: "To implement BST with insert, search, and inorder traversal operations.",
      code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* newNode(int data) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

struct Node* insert(struct Node* root, int data) {
    if (root == NULL) return newNode(data);
    if (data < root->data)
        root->left = insert(root->left, data);
    else
        root->right = insert(root->right, data);
    return root;
}

void inorder(struct Node* root) {
    if (root) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}`,
      output: "Inorder traversal: 20 30 40 50 60 70 80",
      vivaQuestions: [
        { q: "What is BST property?", a: "In BST, left child < parent < right child for every node." },
        { q: "Time complexity of BST operations?", a: "Average: O(log n), Worst case (skewed): O(n)" },
        { q: "What is inorder traversal?", a: "Left -> Root -> Right traversal, gives sorted output in BST." },
      ],
    },
  ],
};

const Lab = () => {
  const [selectedSubject, setSelectedSubject] = useState("DSA Lab");
  const [expandedExp, setExpandedExp] = useState<number | null>(1);
  const [copiedCode, setCopiedCode] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const experiments = labExperiments[selectedSubject as keyof typeof labExperiments] || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Badge variant="glass" className="mb-4">
              <FlaskConical className="w-3 h-3 mr-1" />
              Lab & Viva Bank
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Lab <span className="gradient-text">Experiments</span>
            </h1>
            <p className="text-muted-foreground">
              Complete lab codes with outputs and viva questions
            </p>
          </div>

          {/* Subject Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {labSubjects.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </Button>
            ))}
          </div>

          {/* Experiments List */}
          <div className="space-y-4">
            {experiments.map((exp) => (
              <Card key={exp.id} className="overflow-hidden">
                {/* Header */}
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Experiment {exp.id}: {exp.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{exp.aim}</p>
                    </div>
                  </div>
                  {expandedExp === exp.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>

                {/* Expanded Content */}
                {expandedExp === exp.id && (
                  <CardContent className="border-t border-border">
                    <Tabs defaultValue="code" className="mt-4">
                      <TabsList>
                        <TabsTrigger value="code">
                          <Code className="w-4 h-4 mr-2" />
                          Code
                        </TabsTrigger>
                        <TabsTrigger value="output">
                          <FlaskConical className="w-4 h-4 mr-2" />
                          Output
                        </TabsTrigger>
                        <TabsTrigger value="viva">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Viva Q&A
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="code" className="mt-4">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyCode(exp.id, exp.code)}
                          >
                            {copiedCode === exp.id ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                          <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm">
                            <code>{exp.code}</code>
                          </pre>
                        </div>
                      </TabsContent>

                      <TabsContent value="output" className="mt-4">
                        <div className="p-4 bg-card border border-border rounded-lg">
                          <p className="text-sm font-medium mb-2">Expected Output:</p>
                          <pre className="p-3 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                            {exp.output}
                          </pre>
                        </div>
                      </TabsContent>

                      <TabsContent value="viva" className="mt-4 space-y-3">
                        {exp.vivaQuestions.map((vq, index) => (
                          <div key={index} className="p-4 bg-muted/50 rounded-lg">
                            <p className="font-medium text-sm mb-2">
                              <span className="text-primary">Q{index + 1}:</span> {vq.q}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">Ans:</span> {vq.a}
                            </p>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Coming Soon Notice */}
          {experiments.length === 0 && (
            <Card className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Lab experiments for {selectedSubject} will be added shortly.
              </p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lab;
