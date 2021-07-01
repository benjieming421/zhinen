const column = vm => {
  return [
    {
      label: "资源名称",
      prop: "reName"
    },
    {
      label: "资源网址",
      prop: "reNet"
    },
    {
      label: "资源简介",
      prop: "reNext"
    },
    {
      label: "封面图片",
      prop: "rePicture"
    },
    {
      label: "操作",
      prop: "operator",
      render: [
        {
          component: "el-button",
          label: "编辑",
          props: {
            size: "mini",
            type: "primary",
            style: {}
          },
          method: [
            {
              trigger: "click"
              // instance: vm.方法名
            }
          ]
        },
        {
          component: "el-popconfirm",
          props: {
            title: "确定要删除吗?",
            icon: "el-icon-info",
            iconColor: "red"
          },
          method: [
            {
              trigger: "confirm"
              // instance: vm.handleDelete
            }
          ],
          render: [
            {
              component: "el-button",
              label: "删除",
              slot: "reference",
              props: {
                size: "mini",
                type: "danger"
              }
            }
          ]
        }
      ]
    }
  ];
};

export { column };
