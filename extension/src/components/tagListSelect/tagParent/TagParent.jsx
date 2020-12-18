import React from 'react';
import TagPill from '../../tagPill/TagPill';

function TagParent({ parent, isSelected, onClick }) {
  const select = (collected) => {
    collected.push(parent);
    onClick(collected);
  };

  return (
    <>
      <div className="inline-block border rounded-3xl py-1 px-1" style={{ borderColor: parent.color }}>
        <button
          type="button"
          key={parent._id}
          className={`focus:outline-none ${isSelected(parent) ? '' : 'opacity-20'}`}
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
