import React from 'react';
import TagSelect from '../tagSelect/TagSelect';

function ArticleSidebar(props) {
  const { url, initSelectedTags, onSubmit } = props;

  return (
    <section id="navList" className="py-3">
      Add tags:
      <TagSelect
        initSelectedTags={initSelectedTags}
        url={`http://localhost:3000/api/articles/${url}`}
        onSubmit={onSubmit}
      />
    </section>
  );
}

export default ArticleSidebar;
