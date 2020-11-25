import React from 'react';
import TagSelect from '../tagSelect/TagSelect';

function ArticleSidebar(props) {
  const { url, initSelectedTags, onSubmit } = props;

  return (
    <section id="navList" className="py-3 mx-4 font-sans">
      <span className="block pt-4 pb-4 text-xl font-bold">Add tags to article</span>
      <TagSelect
        initSelectedTags={initSelectedTags}
        url={`http://localhost:3000/api/articles/${url}`}
        onSubmit={onSubmit}
      />
    </section>
  );
}

export default ArticleSidebar;
