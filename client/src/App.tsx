import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BibleStudyPage from "@/pages/bible-study";
import About from "@/pages/about";
import HowToUse from "@/pages/how-to-use";
import Support from "@/pages/support";
import TableOfContents from "@/pages/table-of-contents";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TableOfContents} />
      <Route path="/read" component={BibleStudyPage} />
      <Route path="/about" component={About} />
      <Route path="/how-to-use" component={HowToUse} />
      <Route path="/support" component={Support} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
