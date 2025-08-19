import { useState } from "react";

import TagsSection from "../tags/TagsSection";
import SourcesSection from "../sources/SourcesSection";

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  HR,
} from "flowbite-react";

const TagSourceEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawerClose = () => setIsOpen(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Tags & Sources</Button>
      <Drawer open={isOpen} onClose={handleDrawerClose}>
        <DrawerHeader title="Tag and Source Editor" />
        <DrawerItems>
          <Accordion alwaysOpen={true} collapseAll>
            <AccordionPanel>
              <AccordionTitle>Tags</AccordionTitle>
              <AccordionContent>
                <TagsSection />
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel>
              <AccordionTitle>Sources</AccordionTitle>
              <AccordionContent>
                <SourcesSection />
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default TagSourceEditor;
