import { CreateTestRun } from '@/types';
import { Button, TextArea, TextInput } from '@gravity-ui/uikit';
import React, { FC, useCallback, useState } from 'react';
import './CreateTestRunForm.css';
import { cn } from '@bem-react/classname';

const bem = cn('CreateTestRunForm');

interface CreateTestRunFromProps {
  onCreateTestRun: (testRun: CreateTestRun) => void;
}

export const CreateTestRunForm: FC<CreateTestRunFromProps> = (props) => {
  const { onCreateTestRun } = props;
  const [testRunData, setTestRunData] = useState<CreateTestRun>({
    title: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestRunData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onCreateTestRun(testRunData);
  }, [onCreateTestRun, testRunData]);

  return (
    <div className={bem()}>
      <h2>Создание тестового прогона</h2>
      <form onSubmit={handleSubmit} className={bem('Form')}>
        <TextInput
          type="text"
          id="title"
          name="title"
          placeholder="Название тестового прогона"
          label="Название:"
          value={testRunData.title}
          onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Создать</Button>
      </form>
    </div>
  );
};
