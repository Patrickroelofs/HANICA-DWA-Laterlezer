export default class DownTop {
  constructor(tags, selectedTags) {
    this.tags = tags;
    this.selectedTags = selectedTags;
  }

  childIds(tag) { return tag.children.map((t) => [t._id, ...this.childIds(t)]).flat(); }

  isSelected(tag) {
    return this.selectedTags.find((t) => tag._id.toString() === t._id.toString());
  }

  flatDeep(arr) {
    return arr.reduce((acc, val) => acc.concat(val.children.length > 0 ? [...this.flatDeep(val.children), val] : [val]), []);
  }

  parentTags(tag) { return this.flatDeep(this.tags, Infinity).filter((t) => (this.childIds(t).includes(tag._id))); }

  selectTag(payload) {
    return [payload, ...this.selectedTags];
  }

  deselectTag(payload) {
    return this.selectedTags.filter((t) => payload._id !== t._id);
  }

  getClasses(tag, isStatic) {
    if (this.isSelected(tag)) {
      return 'bg-gray-200 font-bold';
    }
    if (!isStatic && this.parentTags(tag).filter((t) => this.isSelected(t) && this.childIds(t).filter((ta) => this.isSelected({ _id: ta })).length === 0).length > 0) {
      return 'bg-gray-200';
    }
    return '';
  }
}
