import { FeatureTreeNode, TreeNode } from '@/types';

export const compareTreeNodes = (a: TreeNode, b: TreeNode) => {
  if (a.type === 'feature' && b.type === 'feature') {
    return compareFeatures(a, b);
  }

  const sortOrderA = a.sortOrder || Number.MAX_SAFE_INTEGER;
  const sortOrderB = b.sortOrder || Number.MAX_SAFE_INTEGER;

  const titleA = a.title || '';
  const titleB = b.title || '';

  return sortOrderA - sortOrderB || titleA.localeCompare(titleB);
};

function compareFeatures(a: FeatureTreeNode, b: FeatureTreeNode) {
  return a.featureCode.localeCompare(b.featureCode, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}
