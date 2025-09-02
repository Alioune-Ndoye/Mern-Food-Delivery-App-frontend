import { Separator } from "@radix-ui/react-separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger aria-label="Open menu">
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="spaye-y-3">
        <SheetTitle>
           <span> Welcome to MernEats.com</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex-1 font-bold bg-orange-500">
            <Button className="flex">Log In</Button>
        </SheetDescription>      
     </SheetContent>
    </Sheet>
  );
};

export default MobileNav;