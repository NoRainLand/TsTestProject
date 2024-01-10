class Entity {
    id: number;
    components: Component[] = [];

    constructor(id: number) {
        this.id = id;
    }

    addComponent(component: Component): void {
        this.components.push(component);
    }

    getComponent<T extends Component>(type: { new(...args: any[]): T }): T | undefined {
        return this.components.find(c => c instanceof type) as T;
    }
}

class Component {
    entity: Entity;

    constructor(entity: Entity) {
        this.entity = entity;
    }
}

class System {
    entities: Entity[] = [];

    addEntity(entity: Entity): void {
        this.entities.push(entity);
    }

    update(): void {
        // Override this method in subclasses to implement system logic
    }
}