#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n
uniform int numLights;

out vec4 FragColor;

void main() {
    vec3 specular = vec3(0,0,0);
    vec3 diffuse = vec3(0,0,0);
    vec3 N = normalize(frag_normal);
    vec3 ambient = light_ambient;
    for(int currLight=0; currLight < numLights; currLight++){
        vec3 L = normalize(light_position[currLight] - frag_pos);
        diffuse = diffuse + light_color[currLight] * max(0.0, dot(N, L));
        vec3 R = normalize(2.0 * dot(N, L) * N-L);
        vec3 V = normalize(camera_position - frag_pos);
        specular =  specular + pow(max(dot(R, V), 0.0), material_shininess) * material_specular * light_color[currLight];
    }
    ambient = clamp(ambient, 0.0, 1.0);
    diffuse = clamp(diffuse, 0.0, 1.0);
    specular = clamp(specular, 0.0, 1.0);
    FragColor = vec4((ambient + diffuse + specular) * material_color, 1.0);
}
