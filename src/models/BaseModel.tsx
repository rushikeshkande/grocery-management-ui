import {
  removeInstance,
  saveInstance,
  updateInstance,
  deleteAllInstances,
  saveAllInstances
} from "@actions/index";

import { INVALID_INSTANCE_CANNOT_SAVE } from "@constants/actions";
import { isEmpty } from "@utils/index";
import { store } from "@store/index";

function generateInstanceMap(instances) {
  if (isEmpty(instances)) {
    return null;
  }

  const instanceMap = {};

  instances.forEach((instance) => {
    if (!(instance instanceof BaseModel)) {
      throw new Error(INVALID_INSTANCE_CANNOT_SAVE);
    }
    instanceMap[instance.getStoreKey()] = instance;
  });

  return instanceMap;
}

export class BaseModel<P> {
  static resource: string;
  resource: string;
  static constraint;
  static defaultProps;

  constructor(public props: P & { id?: string; isOnList?: boolean }) {
    this.resource = this.constructor["resource"];
    this.props = props;
    this.props.isOnList = true;
  }

  public getStoreKey(): string {
    return `${this.resource}${this.props.id}`;
  }

  public $save(): BaseModel<P> {
    saveInstance(this, this.getStoreKey(), this.resource);
    return this;
  }

  public $update(key: string = ""): BaseModel<P> {
    updateInstance(`${key ? `${this.resource}${key}` : this.getStoreKey()}`, this);
    return this;
  }

  public $delete(casecade: boolean = true): void {
    removeInstance(this.getStoreKey());
  }

  public static get(id: string, state = store.getState()) {
    let modelState = state.models;
    if (!modelState) {
      return;
    }
    let storeKey: string = `${this.resource}${id}`;
    return modelState.toJS ? modelState.get(storeKey) : modelState[storeKey];
  }

  public static getAllFormIds(): string[] {
    const instances = this.list();
    let ids = [];
    instances.forEach((instance) => {
      ids.concat(instance.props.id);
    });
    return ids;
  }

  public static getBy(reference: string, value: string) {
    const instances = this.list();
    return instances.find((instance) => {
      if (instance.props[reference] === value) {
        return instance;
      }
    });
  }

  public static getAllBy(reference: string, value: string) {
    const instances = this.list();
    return instances.filter((instance) => {
      return instance.props[reference] === value;
    });
  }

  public static getFiltered(filterBy: string, state = store.getState()) {
    return state.models.filter((instance) => instance.props.filterBy === filterBy).toArray();
  }
  
  public static list(state = store.getState()) {
    return state.models
      .filter((instance) => {
        return instance && instance.resource === this.resource;
      })
      .toList()
      .toArray();
  }

  public static getAllByType(type, state = store.getState()) {
    const instances = this.list();
    return instances.filter((instance) => {
      return instance.props.type === type;
    });
  }

  public static saveAll<T extends BaseModel<{}>>(instances: T[]): void {
    for (let instance of instances) {
      if (!validateObject(instance, this["constraints"])) {
        throw Error;
      }
    }
    saveAllInstances(generateInstanceMap(instances));
  }

  public static deleteAll(instances = this.list()) {
    deleteAllInstances(
      instances.map((instance) => {
        return instance.getStoreKey();
      })
    );
  }

  public static deleteAllFiltered<T extends BaseModel<{}>>(instances: T[], filterBy: string): void {
    instances.map((instance) => removeInstance(`${filterBy}${instance.props.id}`));
  }

  public static last() {
    const modelState = store.getState().models;
    if (isEmpty(modelState)) {
      return null;
    }
    return modelState.findLast((instance) => instance.resource === this.resource);
  }
}

function validateObject(obj: Object, rules: Object): boolean {
  for (let prop in rules) {
    if (rules.hasOwnProperty(prop)) {
      let constraint = rules[prop];
      if (!constraint(obj[prop])) {
        return false;
      }
    }
  }
  return true;
}
