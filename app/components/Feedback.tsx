import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { options } from "node_modules/axios/index.cjs";
import { FormEvent, ReactNode, createContext, useContext, useEffect, useState } from "react";

interface IAlertDialogOptions {
  key: string;
  title: string;
  message: string;
  onClose?: () => void;
}

interface IConfirmationDialogOptions {
  key: string;
  title: string;
  message: string;
  okLabel?: string;
  onOk?: () => void;
  onClose?: () => void;
}

interface IFormDialogOptions {
  key: string;
  title: string;
  children: ReactNode | ReactNode[];
  submitLabel: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => boolean;
  onClose?: () => void;
}

export interface IFeedbackCtxValue {
  alertDialogs: IAlertDialogOptions[];
  confirmationDialogs: IConfirmationDialogOptions[];
  formDialogs: IFormDialogOptions[];
  showAlertDialog: (options: IAlertDialogOptions) => void;
  hideAlertDialog: (key: string) => void;
  showConfirmationDialog: (options: IConfirmationDialogOptions) => void;
  hideConfirmationDialog: (key: string) => void;
  showFormDialog: (options: IFormDialogOptions) => void;
  hideFormDialog: (key: string) => void;
}

export const FeedbackCtx = createContext<IFeedbackCtxValue | undefined>(undefined);

export function useFeedback() {
  return useContext(FeedbackCtx)!;
}

export function FeedbackProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [isAlertDialog, setAlertDialog] = useState<IAlertDialogOptions[]>([]);
  const [isConfirmationDialog, setConfirmationDialog] = useState<IConfirmationDialogOptions[]>([]);
  const [isFormDialog, setFormDialog] = useState<IFormDialogOptions[]>([]);
  const showAlertDialog = (options: IAlertDialogOptions) => {
    setAlertDialog([...isAlertDialog, options]);
  };

  const hideAlertDialog = (key: string) => {
    const newDialogs = [...isAlertDialog];
    for (let i = 0; i < newDialogs.length; i++) {
      const dialog = newDialogs[i];
      if (dialog.key === key) {
        newDialogs.splice(i, 1);
      }
    }
    setAlertDialog(newDialogs);
  };

  const showConfirmationDialog = (options: IConfirmationDialogOptions) => {
    setConfirmationDialog([...isConfirmationDialog, options]);
  };

  const hideConfirmationDialog = (key: string) => {
    const newDialogs = [...isConfirmationDialog];
    for (let i = 0; i < newDialogs.length; i++) {
      const dialog = newDialogs[i];
      if (dialog.key === key) {
        newDialogs.splice(i, 1);
      }
    }
    setConfirmationDialog(newDialogs);
  };

  const showFormDialog = (options: IFormDialogOptions) => {
    setFormDialog([...isFormDialog, options]);
  };

  const hideFormDialog = (key: string) => {
    const newDialogs = [...isFormDialog];
    for (let i = 0; i < newDialogs.length; i++) {
      const dialog = newDialogs[i];
      if (dialog.key === key) {
        newDialogs.splice(i, 1);
      }
    }
    setFormDialog(newDialogs);
  };

  return (
    <FeedbackCtx.Provider
      value={{
        alertDialogs: isAlertDialog,
        confirmationDialogs: isConfirmationDialog,
        formDialogs: isFormDialog,
        showAlertDialog: showAlertDialog,
        hideAlertDialog: hideAlertDialog,
        showConfirmationDialog: showConfirmationDialog,
        hideConfirmationDialog: hideConfirmationDialog,
        showFormDialog: showFormDialog,
        hideFormDialog: hideFormDialog,
      }}
    >
      {children}
      {isAlertDialog.map((e, i) => {
        return <AlertDialog key={i} options={e} onClose={() => hideAlertDialog(e.key)} />;
      })}
      {isConfirmationDialog.map((e, i) => {
        return (
          <ConfirmationDialog
            key={i}
            options={e}
            onClose={() => hideConfirmationDialog(e.key)}
            onOk={() => hideConfirmationDialog(e.key)}
          />
        );
      })}
      {isFormDialog.map((e, i) => {
        return <FormDialog key={i} options={e} onClose={() => hideFormDialog(e.key)} />;
      })}
    </FeedbackCtx.Provider>
  );
}

const AlertDialog = ({ options, onClose }: { options: IAlertDialogOptions; onClose: () => void }) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>{options.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{options.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const ConfirmationDialog = ({
  options,
  onClose,
  onOk,
}: {
  options: IConfirmationDialogOptions;
  onClose: () => void;
  onOk: () => void;
}) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>{options.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{options.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onOk}>{options.okLabel ?? "Ok"}</Button>
      </DialogActions>
    </Dialog>
  );
};

const FormDialog = ({ options, onClose }: { options: IFormDialogOptions; onClose: () => void }) => {
  const feedback = useFeedback();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = options.onSubmit(e);
    if (result) {
      onClose();
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="xs">
      <form onSubmit={onSubmit}>
        <DialogTitle>{options.title}</DialogTitle>
        <DialogContent>{options.children}</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">{options.submitLabel}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
