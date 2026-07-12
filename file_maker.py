import os
import re

def parse_division_lua(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Simple regex to find division names
    divisions = re.findall(r'^  ([A-Za-z0-9_]+) = {', content, re.MULTILINE)
    
    # Find ranks for each division
    division_data = {}
    for div in divisions:
        # Find the block for this division
        pattern = rf'{div} = \{{.*?ranks = \{{(.*?)\}}'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            ranks_str = match.group(1)
            ranks = re.findall(r'"([^"]+)"', ranks_str)
            division_data[div] = ranks
    
    return division_data

def create_folders(base_path, division_data):
    if not os.path.exists(base_path):
        os.makedirs(base_path)
        print(f"Created base directory: {base_path}")

    for div, ranks in division_data.items():
        div_path = os.path.join(base_path, div)
        if not os.path.exists(div_path):
            os.makedirs(div_path)
            print(f"Created division directory: {div}")
        
        for rank in ranks:
            # Clean rank name for folder
            clean_rank = re.sub(r'[^a-zA-Z0-9_]', '_', rank)
            rank_path = os.path.join(div_path, clean_rank)
            if not os.path.exists(rank_path):
                os.makedirs(rank_path)
                # Create a placeholder file
                with open(os.path.join(rank_path, "put_ids_here.txt"), "w") as f:
                    f.write("Shirt: \nPants: ")
    
    print("\nFinished creating folder structure!")

if __name__ == "__main__":
    lua_path = "division.lua"
    output_path = "Uniforms"
    
    if os.path.exists(lua_path):
        data = parse_division_lua(lua_path)
        create_folders(output_path, data)
    else:
        print(f"Error: {lua_path} not found.")
