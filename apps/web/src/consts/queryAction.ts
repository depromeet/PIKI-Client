/** 페이지 진입 시 `?action=<value>` 로 UI/토스트 등을 실행할 때 사용 */
export const QUERY_ACTION = {
  KEY: 'action',
  VALUE: {
    OPEN_GET_ITEM_DIALOG: 'get-item',
  },
} as const;

export type QueryActionValueT = (typeof QUERY_ACTION.VALUE)[keyof typeof QUERY_ACTION.VALUE];
