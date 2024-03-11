import { AssertionGroup, Feature } from '@/types';

function mdFeatureTitle(feature: Feature) {
  let result = `# ${feature.code} ${feature.title}\r\n\r\n`;
  if(feature.description) {
    result += `${feature.description.trim()}\r\n\r\n`;
  }
  return result;
}

function mdFeatureGroupTitle(groupTitle: string) {
  return `## ${groupTitle.trim()}\r\n\r\n`;
}

function mdDescriptionToQuote(description: string) {
  const quotedNewLines = description.trim().replace(/\n/g, '\n> ');
  return `> ${quotedNewLines}`;
}

function mdFeatureAssertion(assertion: string, description?: string) {
  let result = `- ${assertion.trim()}\r\n\r\n`;
  if (description) {
    result += `${mdDescriptionToQuote(description)}\r\n\r\n`;
  }
  return result;
}

function mdFeatureGroup(assertionGroup: AssertionGroup) {
  let result = '';
  result += mdFeatureGroupTitle(assertionGroup.title);
  assertionGroup.assertions.forEach((assertion) => {
    result += mdFeatureAssertion(assertion.title, assertion.description);
  });
  return result;
}

export function featureToMarkdown(feature: Feature): string {
  let result = '';
  result += mdFeatureTitle(feature);

  feature.assertionGroups.forEach((group) => {
    result += mdFeatureGroup(group);
  });

  return result;
}
