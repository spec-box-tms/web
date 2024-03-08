import { TestResultHistory } from '@/components/TestResultHistory/TestResultHistory';
import { TestResultIcon } from '@/components/TestResultIcon/TestResultIcon';
import { TestResult, TestResultStatus } from '@/types';
import { Button, TextArea } from '@gravity-ui/uikit';
import React, { useCallback, useState } from 'react';
import { bem as bemParent } from '../TestRunExecutionCard.cn';
import './ReportDialog.css';
import { cn } from '@bem-react/classname';
import { STATUS_DESCRIPTION, STATUS_TITLE } from '@/helpers/testStatusTexts';

const bem = cn(bemParent('ReportDialog'));

export interface ReportDialogResult {
  report: string;
}

interface ReportDialogProps {
  newStatus: TestResultStatus;
  testResult: TestResult;
  onAccept: (result: ReportDialogResult) => void;
}
export const ReportDialog: React.FC<ReportDialogProps> = (props) => {
  const { testResult, newStatus, onAccept } = props;

  const [report, setReport] = useState('');

  const handleReportChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReport(value);
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onAccept({ report });
  }, [report, onAccept]);

  return (
    <div className={bem()}>
      <div className={bem('Header')}>
        <div className={bem('Title')}>
          <TestResultIcon status={newStatus} />
          {STATUS_TITLE[newStatus]}
        </div>
        <div className={bem('Description')}>
          {STATUS_DESCRIPTION[newStatus]}
        </div>
      </div>
      <div className={bem('Content')}>
        <form onSubmit={handleSubmit} className={bem('Form')}>
          <div>
            <label htmlFor="report">Отчет:</label>
            <TextArea
              id="report"
              name="report"
              placeholder="Отчет"
              value={report}
              minRows={12}
              maxRows={12}
              onChange={handleReportChange}
            />
          </div>
          <div className={bem('Description')}>
            Отчет поддерживает markdown
          </div>
          <Button view="action" type="submit">Сохранить</Button>
        </form>
        <div className={bem('History')}>
          <div>
            <label htmlFor="report">История запусков:</label>
          </div>
          <div className={bem('List')}>
            <TestResultHistory testResult={testResult} />
          </div>
        </div>
      </div>
    </div>
  );
};
