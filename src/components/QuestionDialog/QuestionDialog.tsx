import { Button, Modal } from '@gravity-ui/uikit';
import { FC, ReactNode } from 'react';
import './QuestionDialog.css';
import { cn } from '@bem-react/classname';

const bem = cn('QuestionDialog');

interface QuestionDialogProps {
  title: string;
  children?: ReactNode;
  onCancel: () => void;
  onAccept: () => void;
  open: boolean;
}

export const QuestionDialog: FC<QuestionDialogProps> = (props) => {
  const { title, children, onCancel, onAccept, open } = props;

  return <Modal open={open}>
    <div className={bem()}>
      <h2>{title}</h2>
      {children}
      <div className={bem('Actions')}>
        <Button view="normal" onClick={onCancel}>Отмена</Button>
        <Button view="action" onClick={onAccept}>Подтвердить</Button>
      </div>
    </div>
  </Modal>;
};
