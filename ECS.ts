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

class RenderComponent extends Component {
    color: string;

    constructor(entity: Entity, color: string) {
        super(entity);
        this.color = color;
    }
}

class RenderSystem extends System {
    update(): void {
        this.entities.forEach(entity => {
            const renderComponent = entity.getComponent(RenderComponent);
            if (renderComponent) {
                // Render the entity using the data in the renderComponent
                console.log(`Rendering entity ${entity.id} with color ${renderComponent.color}`);
            }
        });
    }
}