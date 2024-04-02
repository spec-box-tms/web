import { AttributeValue as AttributeValueModel } from '@/types';
import { Label } from '@gravity-ui/uikit';
import { FC } from 'react';

interface AttributeValueProps {
  attributeValue: AttributeValueModel;
}

export const AttributeValue: FC<AttributeValueProps> = (props) => {
  const { attributeValue } = props;
  return <Label value={attributeValue.title ?? attributeValue.code}>
    {attributeValue.attribute.title ?? attributeValue.attribute.code}
  </Label>;
};
