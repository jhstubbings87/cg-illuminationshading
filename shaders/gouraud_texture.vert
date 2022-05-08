#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;
in vec2 vertex_texcoord;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform float material_shininess;
uniform vec2 texture_scale;
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;
uniform int numLights;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;
out vec2 frag_texcoord;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    frag_texcoord = vertex_texcoord * texture_scale;
	ambient = light_ambient;
	ambient = clamp(ambient, 0.0, 1.0);

	for(int currLight=0; currLight < numLights; currLight++){
		vec3 V = vec3(model_matrix * vec4(vertex_position, 1.0));
		vec3 N = normalize(inverse(transpose(mat3(model_matrix))) * vertex_normal);
		vec3 directionOfLight = normalize(light_position[currLight] - V);
		diffuse = diffuse + light_color[currLight] * dot(N, directionOfLight);
		vec3 viewDirect = normalize(camera_position - V); 
		vec3 reflectDirect = normalize(reflect(-directionOfLight, N));
		specular = specular + light_color[currLight] * pow(dot(reflectDirect, viewDirect), material_shininess);
	}
	specular = clamp(specular, 0.0, 1.0);
	diffuse = clamp(diffuse, 0.0, 1.0);

}