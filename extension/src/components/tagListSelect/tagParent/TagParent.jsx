import React from 'react';
import TagPill from '../../tagPill/TagPill';

function TagParent({ parent, isSelected, onClick }) {
  const select = (collected) => {
    collected.push(parent);
    onClick(collected);
  };

  return (
    <>
      <div className="inline-block border rounded-3xl m-0.5" style={{ borderColor: parent.color }}>
        <button
          type="button"
          key={parent._id}
          className={`m-0.5 focus:outline-none ${isSelected(parent) ? '' : 'opacity-20'}`}
          onClick={() => select([])}
          value={parent._id}
        >
          <TagPill data={parent} />
        </button>
        {/* eslint-disable-next-line max-len */}
        { parent.children.map((tag) => <TagParent parent={tag} isSelected={isSelected} onClick={select} />) }
      </div>
    </>
  );
}

export default TagParent;
