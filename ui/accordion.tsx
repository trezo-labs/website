"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";
import { Icons } from "hugeicons-proxy";

function Accordion({ ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <Icons.ArrowDown01Icon
          strokeWidth={2}
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <Icons.ArrowUp01Icon
          strokeWidth={2}
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

// function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
//   return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
// }

// function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
//   return (
//     <AccordionPrimitive.Item
//       data-slot="accordion-item"
//       className={cn("border-b last:border-b-0 border", className)}
//       {...props}
//     />
//   );
// }

// function AccordionTrigger({
//   className,
//   children,
//   ...props
// }: AccordionPrimitive.Trigger.Props) {
//   return (
//     <AccordionPrimitive.Header className="flex">
//       <AccordionPrimitive.Trigger
//         data-slot="accordion-trigger"
//         className={cn(
//           "group/accordion-trigger relative flex flex-1 items-start justify-between gap-6 border border-transparent p-4 text-left text-sm font-medium transition-all outline-none hover:underline aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
//           className,
//         )}
//         {...props}
//       >
//         {children}

//       </AccordionPrimitive.Trigger>
//     </AccordionPrimitive.Header>
//   );
// }

// function AccordionContent({
//   className,
//   children,
//   ...props
// }: AccordionPrimitive.Panel.Props) {
//   return (
//     <AccordionPrimitive.Panel
//       data-slot="accordion-content"
//       className="overflow-hidden px-4 text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
//       {...props}
//     >
//       <div
//         className={cn(
//           "h-(--accordion-panel-height) pt-0 pb-4 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
//           className,
//         )}
//       >
//         {children}
//       </div>
//     </AccordionPrimitive.Panel>
//   );
// }

// export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
