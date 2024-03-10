import { Popup } from '@gravity-ui/uikit';
import { FC, useEffect, useState } from 'react';
import './TextSuggestions.css';
import { cn } from '@bem-react/classname';

const bem = cn('TextSuggestions');

interface TextSuggestionsProps {
  anchorRef: React.RefObject<Element>;
  value?: string;
  items: string[];
  onSelect?: (value: string) => void;
}

export const TextSuggestions: FC<TextSuggestionsProps> = (props) => {
  const { anchorRef, value, items, onSelect } = props;
  const [visible, setVisible] = useState(false);
  const [previousValue, setPreviousValue] = useState(value);

  useEffect(() => {
    if(value !== previousValue) {
      setVisible(true);
      setPreviousValue(value);
    }
  }, [value, previousValue, setVisible, setPreviousValue]);

  const handleItemSelected = (item: string) => {
    setPreviousValue(item);
    setVisible(false);
    onSelect?.(item);
  };

  const filtredItems = items.filter((item) => !value || item.toLowerCase().includes(value.toLowerCase().trim()));

  const itemElements = filtredItems.map((item) => <div className={bem('Item')} key={item} onClick={() => handleItemSelected(item)}>{item}</div>);

  if(!visible || filtredItems.length === 0) {
    return null;
  }

  return <Popup contentClassName={bem()} anchorRef={anchorRef} placement="bottom-start" open={visible} onClose={() => setVisible(false)}>
    {itemElements}
  </Popup>;
};
