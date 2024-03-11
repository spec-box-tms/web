import { CreateTestRun } from '@/types';
import { cn } from '@bem-react/classname';
import { CircleInfo } from '@gravity-ui/icons';
import { Button, Icon, TextArea, TextInput, Tooltip } from '@gravity-ui/uikit';
import React, { FC, useCallback, useRef, useState } from 'react';
import './CreateTestRunForm.css';
import { TextSuggestions } from '../TextSuggestions/TextSuggestions';
import { formatDate } from '@/helpers/formatDate';

const bem = cn('CreateTestRunForm');

interface CreateTestRunFromProps {
  onCreateTestRun: (testRun: CreateTestRun) => void;
  configurations: string[];
  environments: string[];
}

export const CreateTestRunForm: FC<CreateTestRunFromProps> = (props) => {
  const { onCreateTestRun, configurations, environments } = props;
  const [testRunData, setTestRunData] = useState<CreateTestRun>({
    title: formatDate(new Date()),
  });

  const environmentInputRef = useRef(null);
  const configurationInputRef = useRef(null);

  const handleChange = (changes: Partial<CreateTestRun>) => {
    setTestRunData((prevData) => ({
      ...prevData,
      ...changes
    }));
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onCreateTestRun(testRunData);
  }, [onCreateTestRun, testRunData]);

  const environmentHint = <Tooltip content="dev, stage, prod или ссылка на окружение">
    <Icon data={CircleInfo} />
  </Tooltip>;

  const configurationHint = <Tooltip content="операционная система, браузер, разрешение экрана">
    <Icon data={CircleInfo} />
  </Tooltip>;

  return (
    <div className={bem()}>
      <h2>Создание тестового запуска</h2>
      <form onSubmit={handleSubmit} className={bem('Form')}>
        <TextInput
          type="text"
          id="title"
          name="title"
          placeholder="Название тестового запуска"
          label="Название:"
          value={testRunData.title}
          onChange={({ target: { value } }) => handleChange({ title: value })}
        />
        <div>
          <label htmlFor="description">Описание:</label>
          <TextArea
            id="description"
            name="description"
            placeholder="Описание"
            value={testRunData.description}
            minRows={3}
            maxRows={6}
            onChange={({ target: { value } }) => handleChange({ description: value })}
          />
        </div>
        <TextInput
          ref={environmentInputRef}
          type="text"
          id="environment"
          name="environment"
          placeholder="Тестовое окружение"
          label="Окружение:"
          rightContent={environmentHint}
          value={testRunData.environment}
          onChange={({ target: { value } }) => handleChange({ environment: value })}
          />
        <TextInput
          ref={configurationInputRef}
          type="text"
          id="configuration"
          name="configuration"
          placeholder="Тестовая конфигурация"
          label="Конфигурация:"
          rightContent={configurationHint}
          value={testRunData.configuration}
          onChange={({ target: { value } }) => handleChange({ configuration: value })}
        />
        <Button type="submit">Создать</Button>
        <TextSuggestions 
          anchorRef={environmentInputRef} 
          value={testRunData.environment} 
          items={environments} 
          onSelect={(value) => handleChange({ environment: value })} 
        />
        <TextSuggestions 
          anchorRef={configurationInputRef} 
          value={testRunData.configuration} 
          items={configurations} 
          onSelect={(value) => handleChange({ configuration: value })} 
        />
      </form>
    </div>
  );
};
