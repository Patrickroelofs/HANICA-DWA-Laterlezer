import React from 'react';
import TagPill from '../../../../sharedcomponents/tagPill/TagPill';

function TagParent({ parent, isSelected, onClick }) {
  const select = (collected) => {
    collected.push(parent);
    onClick(collected);
  };

  return (
    <>
      <div key={parent._id} className="inline-block border rounded-3xl px-0.5 py-0.5" style={{ borderColor: parent.color }}>
        <button
          type="button"
          key={parent._id}
          className={`focus:outline-none ${isSelected(parent) ? '' : 'opacity-20'}`}
          onClick={() => select([])}
          value={parent._id}
        >
          <TagPill data={parent} />
        </button>
        {parent.children.map((tag) => <TagParent parent={tag} isSelected={isSelected} onClick={select} />)}
      </div>
    </>
  );
}

export default TagParent;
