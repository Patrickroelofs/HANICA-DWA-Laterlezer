export default class TopDown {
  constructor(tags, selectedTags) {
    this.tags = tags;
    this.selectedTags = selectedTags;
  }

  isSelected(tag) {
    return this.selectedTags.find((t) => tag._id.toString() === t._id.toString());
  }

  childIds(tag) { return tag.children.map((t) => [t._id, ...this.childIds(t)]).flat(); }

  flatDeep(arr) {
    return arr.reduce((acc, val) => acc.concat(val.children.length > 0 ? [...this.flatDeep(val.children), val] : [val]), []);
  }

  parentTags(tag) { return this.flatDeep(this.tags, Infinity).filter((t) => (this.childIds(t).includes(tag._id))); }

  selectTag(payload) {
    const parentTags = this.parentTags(payload).filter((parentTag) => !this.isSelected(parentTag));
    return [payload, ...parentTags, ...this.selectedTags];
  }

  deselectTag(payload) {
    const childIds = this.childIds(payload);
    const parentTags = this.parentTags(payload);
    const parentIds = parentTags.filter((tag) => {
      const hasSelectedChild = this.childIds(tag).filter((id) => {
        if (!parentTags.find((selTag) => id === selTag._id) && !childIds.includes(id)) {
          return this.selectedTags.find((selTag) => id === selTag._id.toString());
        }
        return false;
      });
      return hasSelectedChild.length === 1;
    }).map((tag) => tag._id.toString());
    return this.selectedTags.filter((t) => ![...childIds, ...parentIds, payload._id].includes(t._id));
  }

  getClasses(tag) {
    return this.isSelected(tag) ? 'bg-gray-200' : '';
  }
}
