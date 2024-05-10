import os

def copy_code_to_single_file(input_dir, output_file):
    ignore_dirs = ['node_modules', 'tests']  # Directories to ignore

    with open(output_file, 'w') as output:
        for root, dirs, files in os.walk(input_dir):
            for ignore_dir in ignore_dirs:
                if ignore_dir in dirs:
                    dirs.remove(ignore_dir)  # Ignore specified directories
            for file in files:
                if file.endswith('.ts') or file.endswith('.prisma'):  # Process TypeScript and Prisma files
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r') as input_file:
                        output.write(f"### {file_path}\n\n")  # Add file path as a comment
                        output.write(input_file.read())
                        output.write('\n\n')  # Add a separator between files

# Get the current directory
current_directory = os.getcwd()

# Example usage:
output_file_path = 'output_file.ts'  # Output file name

copy_code_to_single_file(current_directory, output_file_path)
