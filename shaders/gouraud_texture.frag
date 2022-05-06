#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image;        // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() { 
    //FragColor = texture(image, frag_texcoord);
    vec4 newAmbient = vec4(ambient * material_color, 1.0);
    vec4 newDiffuse = vec4(diffuse * material_color, 1.0);
    vec4 newSpecular = vec4(specular * material_specular, 1.0);

    //put a limit on the emissions
    vec4 totalColor = vec4(material_color * (ambient + diffuse) + specular * material_specular, 1.0);
    totalColor = clamp(totalColor, 0.0, 1.0);

    FragColor = totalColor * texture(image, frag_texcoord);
}
