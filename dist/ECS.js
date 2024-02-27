"use strict";
class Entity {
    constructor(id) {
        this.components = [];
        this.id = id;
    }
    addComponent(component) {
        this.components.push(component);
    }
    getComponent(type) {
        return this.components.find(c => c instanceof type);
    }
}
class Component {
    constructor(entity) {
        this.entity = entity;
    }
}
class System {
    constructor() {
        this.entities = [];
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    update() {
        // Override this method in subclasses to implement system logic
    }
}
class RenderComponent extends Component {
    constructor(entity, color) {
        super(entity);
        this.color = color;
    }
}
class RenderSystem extends System {
    update() {
        this.entities.forEach(entity => {
            const renderComponent = entity.getComponent(RenderComponent);
            if (renderComponent) {
                // Render the entity using the data in the renderComponent
                console.log(`Rendering entity ${entity.id} with color ${renderComponent.color}`);
            }
        });
    }
}
