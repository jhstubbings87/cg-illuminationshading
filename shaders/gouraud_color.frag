#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks

out vec4 FragColor;
vec4 color;

void main() {
    //TODO: handle multiple light sources
    color = vec4(((ambient + diffuse + (specular * material_specular)) * material_color), 1.0);
    FragColor = clamp(color, 0.0, 1.0);
}
