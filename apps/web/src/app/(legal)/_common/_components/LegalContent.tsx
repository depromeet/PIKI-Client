import { readFileSync } from 'fs';
import path from 'path';

import styles from '../_styles/legal.module.css';

const legalHtmlPaths = {
  privacy: 'src/app/(legal)/privacy/_assets/privacy.html',
  terms: 'src/app/(legal)/terms/_assets/terms.html',
};

type LegalDocumentT = keyof typeof legalHtmlPaths;

type LegalContentProps = {
  document: LegalDocumentT;
};

const getLegalHtmlParts = (document: LegalDocumentT) => {
  const htmlPath = path.join(process.cwd(), legalHtmlPaths[document]);
  const html = readFileSync(htmlPath, 'utf-8');
  return html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? '';
};

function LegalContent({ document }: LegalContentProps) {
  const bodyContent = getLegalHtmlParts(document);

  return (
    <div className={styles.root}>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </div>
  );
}

export default LegalContent;
