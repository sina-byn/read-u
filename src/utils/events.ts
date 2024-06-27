export const EditorScrollEvent = (() => {
  const event = 'editor-scroll-trigger';

  return {
    event,
    dispatch: (line: number) => dispatchEvent(new CustomEvent(event, { detail: line })),
  };
})();
