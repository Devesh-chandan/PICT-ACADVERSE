import { GraduationCap, Twitter, Github, Linkedin, Mail, Check } from "lucide-react";

export const Icons = {
  logo: (props: any) => <GraduationCap {...props} />,
  twitter: (props: any) => <Twitter {...props} />,
  gitHub: (props: any) => <Github {...props} />,
  linkedin: (props: any) => <Linkedin {...props} />,
  mail: (props: any) => <Mail {...props} />,
  check: (props: any) => <Check {...props} />,
  // Add other icons here as needed
};