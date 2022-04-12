export const useStepTitleDesc = (
  step: number,
  messages: any,
  page: 'create' | 'restore'
) => {
  const data = [
    {
      title: messages?.stepOneTitle(),
      desc: messages?.stepOneDesc(),
    },
    {
      title: messages?.stepTwoTitle(),
      desc: messages?.stepTwoDesc(),
    },
    {
      title: page === 'create' ? messages?.stepThreeTitle() : null,
      desc: page === 'create' ? messages?.stepThreeDesc() : null,
    },
  ];

  return {
    stepTitle: data[step].title,
    stepDesc: data[step].desc,
  };
};
