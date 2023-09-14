export function normalize(values: number[], total: number) {
    var max = Math.max(...values);
    var min = Math.min(...values);

    var normalized_value = (total - min) / (max - min);

    return normalized_value;
}