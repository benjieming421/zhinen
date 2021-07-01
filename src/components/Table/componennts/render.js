/**
 * @description 获取组件方法
 * @param {Function} methods 方法
 * @param {Object} params 方法参数
 */
const handleGetComponentMethods = (methods, params) => {
  if (methods && methods.length > 0) {
    let method = {};
    for (let curr of methods) {
      method[curr.trigger] = handleBindMethod(curr.instance, params);
    }
    return method;
  }
  return null;
};

/**
 * @description 参数与方法绑定
 * @param {Function} method 要绑定的方法
 * @param {Object} params 方法接受的参数
 */
const handleBindMethod = (method, params) => {
  return () => method(handleCopyObject(params));
};
/**
 * @description 复制对象
 * @param {Object} obj 要复制的对象
 */
const handleCopyObject = obj => {
  let tmp = {};
  if (!obj) {
    return tmp;
  }
  for (let item in obj) {
    let type = handleGetDataType(obj[item]);
    switch (type) {
      case "Array":
        tmp[item] = obj[item].map(item => item);
        break;
      case "Object":
        tmp[item] = handleCopyObject(obj[item]);
        break;
      default:
        tmp[item] = obj[item];
    }
  }
  return tmp;
};
/**
 * @description 获取数据类型
 * @param {Object} data 数据
 */
const handleGetDataType = data => {
  let type = Object.prototype.toString.call(data);
  let start = type.indexOf("object");
  let end = type.lastIndexOf("]");
  return type.substring(start + 7, end);
};

/**
 * 递归渲染组件
 * @param {Object} vue 的 createElement 对象
 * @param {Object} 组件信息
 * @param {params} 事件参数
 */
const handleGetRenderComponent = (h, components, params) => {
  if (components && components.length > 0) {
    let component = [];
    for (let curr of components) {
      if (!curr.parent) {
        component.push(
          h(
            curr.component,
            {
              props: curr.props || {},
              style: curr.props.style || {},
              on: handleGetComponentMethods(curr.method, params),
              slot: curr.slot
            },
            [
              curr.render
                ? handleGetRenderComponent(h, curr.render, params)
                : curr.label
            ]
          )
        );
      }
    }
    return component;
  }
  return [];
};

const handleGetRenderComponentChildren = (h, components, params) => {
  if (components && components.length > 0) {
    let component = [];
    for (let curr of components) {
      if (curr.parent) {
        component.push(
          h(
            curr.component,
            {
              props: curr.props || {},
              style: curr.props.style || {},
              on: handleGetComponentMethods(curr.method, params),
              slot: curr.slot
            },
            [
              curr.render
                ? handleGetRenderComponent(h, curr.render, params)
                : curr.label
            ]
          )
        );
      }
    }
    return component;
  }
  return [];
};

export { handleGetRenderComponent, handleGetRenderComponentChildren };
