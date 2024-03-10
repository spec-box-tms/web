import { NodeStyle } from '@antv/graphin';
import { TEST_STATUS_COLORS } from './testStatusColors';
import { FeatureRelationNode, TestResult, TestResultStatus } from '@/types';

const BADGE_POSITIONS: Record<TestResultStatus, string> = {
  PASSED: 'RT',
  FAILED: 'LT',
  BLOCKED: 'LB',
  INVALID: 'RB',
  SKIPPED: '',
  NEW: '',
};

interface StatItem {
  status: TestResultStatus;
  count: number;
}

function testStatsToBadges(stats: StatItem[]) {
  const badges = [];
  for (const stat of stats) {
    if(stat.status === 'SKIPPED' || stat.status === 'NEW') {
      continue;
    }
    if (stat.count > 0) {
      badges.push({
        position: BADGE_POSITIONS[stat.status],
        type: 'text',
        value: stat.count.toString(),
        size: 20,
        color: '#fff',
        fill: TEST_STATUS_COLORS[stat.status],
        stroke: '#0000'
      });
    }
  }
  return badges;
}

export function testResultsToStyle(node: FeatureRelationNode, testResults: TestResult[]) {
  if(node.nodeType !== 'feature') {
    return node;
  }
  const featureResults = testResults.filter(testResult => testResult.featureCode === node.code);

  const total = featureResults.length;
  const stats: StatItem[] = [
    { status: 'PASSED', count: 0 },
    { status: 'FAILED', count: 0 },
    { status: 'BLOCKED', count: 0 },
    { status: 'INVALID', count: 0 },
    { status: 'SKIPPED', count: 0 },
    { status: 'NEW', count: 0 },
  ];

  featureResults.forEach(testResult => {
    if (testResult.status === 'PASSED') {
      stats[0].count++;
    } else if (testResult.status === 'FAILED') {
      stats[1].count++;
    } else if (testResult.status === 'BLOCKED') {
      stats[2].count++;
    } else if (testResult.status === 'INVALID') {
      stats[3].count++;
    } else if (testResult.status === 'SKIPPED') {
      stats[4].count++;
    } else if (testResult.status === 'NEW') {
      stats[5].count++;
    }
  });

  const maxStatus = [...stats].sort((a, b) => b.count - a.count)[0];
  console.log(maxStatus);
  const style: Partial<NodeStyle> = {
    ...node.style,
    keyshape: {
      fill: TEST_STATUS_COLORS[maxStatus.status],
      stroke: TEST_STATUS_COLORS[maxStatus.status],
      fillOpacity: .3,
      size: 25 + 5 * node.nodeRate,
    },
    icon: {
      type: 'text',
      value: total.toString(),
      size: 20,
      fill: TEST_STATUS_COLORS[maxStatus.status],
      stroke: '#0000'
    },
    badges: testStatsToBadges(stats),
  };

  const newNode = {
    ...node,
    style
  };

  return newNode;
}
