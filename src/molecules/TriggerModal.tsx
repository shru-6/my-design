import * as React from "react";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from "./Modal";
import { Button } from "../atoms/Button";

export interface TriggerModalProps
  extends Omit<React.ComponentProps<typeof Modal>, "children"> {
  // Trigger button
  triggerLabel?: string | React.ReactNode;
  trigger?: React.ReactNode;
  triggerProps?: React.ComponentProps<typeof Button>;
  stopPropagation?: boolean;
  icon?: React.ReactNode;
  // Modal content
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  // Modal props
  showCloseButton?: boolean;
  className?: string;
  message?: string;
}

export function TriggerModal({
  open,
  onOpenChange,
  triggerLabel,
  trigger,
  triggerProps,
  stopPropagation = true,
  icon,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  className,
  message,
  ...props
}: TriggerModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} {...props}>
      {(triggerLabel || trigger || icon) && (
        <ModalTrigger asChild>
          {trigger || (
            <Button {...triggerProps} stopPropagation={stopPropagation}>
              {icon && <span className="mr-2">{icon}</span>}
              {triggerLabel && <span>{triggerLabel as React.ReactNode}</span>}
            </Button>
          )}
        </ModalTrigger>
      )}
      <ModalContent
        data-slot="trigger-modal"
        showCloseButton={showCloseButton}
        className={className}
        onClick={(e) => e.stopPropagation()}
        header={
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            {description && <ModalDescription>{description}</ModalDescription>}
          </ModalHeader>
        }
        footer={footer ? <ModalFooter>{footer}</ModalFooter> : undefined}
      >
        {message && <p className="text-sm text-muted-foreground mb-4">{message}</p>}
        {children}
      </ModalContent>
    </Modal>
  );
}
