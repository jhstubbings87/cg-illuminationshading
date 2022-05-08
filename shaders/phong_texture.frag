#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;
in vec2 frag_texcoord;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n
uniform sampler2D image;          // use in conjunction with Ka and Kd
uniform int numLights;

out vec4 FragColor;

void main() {
    vec4 textureData = texture(image, frag_texcoord);
    vec3 N = normalize(frag_normal);
    vec3 V = normalize(camera_position - frag_pos);
    vec3 ambient = light_ambient * material_color * vec3(textureData);
    vec3 diffuse = vec3(0,0,0);
    vec3 specular = vec3(0,0,0);

    for(int currLight = 0; currLight < numLights; currLight++) {
        vec3 L = normalize(light_position[currLight] - frag_pos);
        diffuse = diffuse + light_color[currLight] * material_color * vec3(textureData) * max(dot(N, L), 0.0);
        vec3 R = normalize(2.0 * dot(N, L) * N-L);
        specular = specular + light_color[currLight] * material_specular * pow(max(dot(R, V), 0.0), material_shininess);
    }

    FragColor = vec4(clamp(ambient + diffuse + specular, 0.0, 1.0), 1.0);
}
