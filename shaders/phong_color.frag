#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {
    vec3 L = normalize(light_position - frag_pos);
    vec3 N = normalize(frag_normal);
    vec3 ambient = light_ambient;
    vec3 diffuse = light_color * max(0.0, dot(N, L));
    vec3 R = (dot(N, L)) * 2.0 * N - L;
    vec3 V = normalize(camera_position - frag_pos);
    vec3 specular =  pow(max(dot(R, V), 0.0), material_shininess) * light_color * material_specular;
    FragColor = vec4((ambient + diffuse + specular) * material_color, 1.0);
}
