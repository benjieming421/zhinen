const column = vm => {
  return [
    {
      label: "用户名",
      prop: "userName"
    },
    {
      label: "学历",
      prop: "education"
    },
    {
      label: "联系电话",
      prop: "telphone"
    },
    {
      label: "邮箱",
      prop: "email"
    },
    {
      label: "操作",
      prop: "operator",
      render: [
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
