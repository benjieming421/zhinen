<style scoped></style>
<script>
import {
  handleGetRenderComponent,
  handleGetRenderComponentChildren
} from "./render.js";
export default {
  name: "ColumnSlot",
  props: {
    row: {
      type: Object,
      required: true,
      default: () => {}
    },
    column: {
      type: Object,
      default: null
    },
    $index: Number,
    render: {
      type: Array,
      required: true,
      default: () => {}
    }
  },
  functional: true,
  render: (h, data) => {
    const params = {
      index: data.props.$index,
      ...data.props.row
    };
    const render = data.props.render;
    let has_children_name = data.parent.treeProps
      ? data.parent.treeProps.hasChildren
      : false;
    let components =
      data.props.column.children && params[has_children_name]
        ? handleGetRenderComponentChildren(h, render, params)
        : handleGetRenderComponent(h, render, params);
    return components;
  }
};
</script>
