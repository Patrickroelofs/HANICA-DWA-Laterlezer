import React from 'react';

export default function ArticleSkeleton() {
  const width = () => [44, 48, 52, 56, 60, 64, 72][Math.floor(Math.random() * 6)];
  const background = () => [50, 100, 200, 400][Math.floor(Math.random() * 3)];

  return (
    <article className="grid grid-cols-4 mt-6 animate-pulse">
      <div className={`w-auto h-36 bg-cover bg-center rounded-xl col-span-1 shadow-xl bg-gray-${background()}`} />
      <div className="col-span-3 ml-8">
        <div className="articleTags pb-2 text-xs overflow-x-hidden whitespace-nowrap overflow-ellipsis">
          <span className={`inline-block pt-2 pb-2 pr-3 pl-3 mr-2 mb-1 white rounded-3xl font-sans flex-shrink-0 h-6 w-12 bg-gray-${background()}`} />
          <span className={`inline-block pt-2 pb-2 pr-3 pl-3 mr-2 mb-1 white rounded-3xl font-sans flex-shrink-0 h-6 w-12 bg-gray-${background()}`} />
        </div>
        <div className={`font-bold bg-gray-200 flex-shrink-0 h-6 w-${width()}`} />
        <p className={`mt-4 bg-gray-100 flex-shrink-0 h-6 w-${width()}`} />
        <p className={`mt-2 bg-gray-100 flex-shrink-0 h-6 w-w-${width()}`} />
      </div>
    </article>
  );
}
