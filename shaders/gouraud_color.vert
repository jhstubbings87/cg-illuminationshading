#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform float material_shininess; // n
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;
uniform int numLights;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {    //Set the ambieance
    ambient = light_ambient;
    // set the diffusion
    vec3 envVertexPosition = vec3(model_matrix * vec4(vertex_position, 1.0));

    for(int i=0; i < numLights; i++){
        vec3 L = normalize(light_position[i] - envVertexPosition);
        vec3 N = normalize(vertex_normal);
        //the max is diffusal brightness
        diffuse = diffuse + light_color[i] * max(0.0, dot(N, L));
        // set the specular
        vec3 R = (dot(N, L)) * 2.0 * N - L;
        vec3 V = normalize(camera_position - envVertexPosition);
        //pow is specular intesity
        specular = specular + pow(max(dot(R, V), 0.0), material_shininess) * light_color[i];
    }

    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
}
