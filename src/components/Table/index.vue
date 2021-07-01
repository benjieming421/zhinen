<template>
  <div class="table-container">
    <el-table
      ref="table"
      :data="data"
      :max-height="maxHeight"
      :load="load"
      :tree-props="treeProps"
      :row-key="rowKey"
      :lazy="lazy"
    >
      <el-table-column
        v-for="(item, idx) in columns"
        :key="idx"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <column-slot
            v-if="item.render"
            :render="item.render"
            :row="scope.row"
            :column="item"
            :$index="scope.$index"
          ></column-slot>
          <span v-else> {{ scope.row[item.prop] }} </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage / 10 + 1"
      :page-count="pageCount"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleOnCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import ColumnSlot from "./componennts/ColmunSlot.vue";
export default {
  name: "Table",
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    total: {
      type: Number,
      required: true,
      default() {
        return 0;
      }
    },
    pageCount: {
      type: Number,
      required: true,
      default() {
        return 10;
      }
    },
    treeProps: {
      type: Object,
      required: false
    },
    load: {
      type: Function,
      required: false
    },
    rowKey: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Function | String,
      required: false
    },
    lazy: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  methods: {
    handleOnCurrentChange(val) {
      this.search.page = val;
      this.handleOnSearch();
    }
  },
  data() {
    return {
      maxHeight: 0
    };
  },
  watch: {
    maxHeight: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          const table = this.$refs.table;
          const paging_height = 32;
          let total_height = document.documentElement.clientHeight;
          let height = total_height - paging_height - table.$el.offsetTop;
          this.maxHeight = height;
        });
      }
    }
  },
  components: {
    ColumnSlot
  },
  inject: ["handleOnSearch", "search"]
};
</script>

<style></style>
