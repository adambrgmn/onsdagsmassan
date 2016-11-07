// @flow

import content from '../../db.json';

type Section = {
  title: string;
  body: string;
  uri: string;
}

const readContent = (section: string): Promise<Section> => new Promise((resolve, reject) => {
  setTimeout(() => {
    const sectionContent = content[section];

    if (!sectionContent) return reject(new Error(`No content found for section ${section}`));
    return resolve(sectionContent);
  }, 100);
});

export default async function getContent(section: string): Promise<Section> {
  try {
    const sectionContent = await readContent(section);
    return sectionContent;
  } catch (err) {
    return err;
  }
}
