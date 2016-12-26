
export default function fluent(target, name, descriptor) {
    const method = descriptor.value;

    descriptor.value = function (...args) {
        method.apply(this, args);
        return this;
    }
}
