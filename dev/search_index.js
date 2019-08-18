var documenterSearchIndex = {"docs":
[{"location":"enright/#","page":"Introduction","title":"Introduction","text":"EditURL = \"https://github.com/akels/ElTopo.jl/blob/master/examples/enright.jl\"","category":"page"},{"location":"enright/#Introduction-1","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"ElTopo.jl is a library which allows to restructure and refine triangular mesh as it evolves. Suitable to simulate time dependant boundary problems, such as droplet behaviour uppon external fields, gradients, and it's changing surface tension. Or interfaces of homogenous liquids in a container. Full range of possibilities can be explored in the original C++ library ElTopo, which is interfaces here with Cxx.jl.","category":"page"},{"location":"enright/#The-Enright-test-1","page":"Introduction","title":"The Enright test","text":"","category":"section"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"To see the algorithm in action we may look how a triangulated sphere behaves under periodic incompressable shear flow.","category":"page"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"First, let's define a Enright velocity field:","category":"page"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"using GeometryTypes\nusing AbstractPlotting, GLMakie\nusing ElTopo\n\nfunction velocity(t,pos)\n    x,y,z = pos\n\n    x = x*0.15 + 0.35\n    y = y*0.15 + 0.35\n    z = z*0.15 + 0.35\n\n    u = 2*sin(pi*x)^2 * sin(2*pi*y) * sin(2*pi*z) * sin(2/3*pi*t)\n    v = - sin(2*pi*x) * sin(pi*y)^2 * sin(2*pi*z) * sin(2/3*pi*t)\n    w = - sin(2*pi*x) * sin(2*pi*y) * sin(pi*z)^2 * sin(2/3*pi*t)\n\n    [u,v,w] /0.3 #/0.15\nend","category":"page"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"First let's create a sphere mesh.","category":"page"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"include(\"sphere.jl\")\nmsh = unitsphere(2)","category":"page"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"Now let's do something fun.","category":"page"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"x = Node(msh)\ny = lift(x->x,x)\n\nscene = Scene(show_axis=false)\n\nwireframe!(scene,y,linewidth = 3f0)\nmesh!(scene,y, color = :white, shading = false)\n\ndisplay(scene)\n\nt = 0\nΔt = 0.01\nN = convert(Int,floor(pi/ Δt))\n\n# msh = HomogenousMesh(v0,f0)\npar = SurfTrack(allow_vertex_movement=true)\n\nrecord(scene, \"enright.gif\", 1:N) do i # for i in 1:N\n    update_cam!(scene,Vec3f0(4,4,4), Vec3f0(2, 0, 0))\n\n    ### Second order RK2\n    global v = msh.vertices\n    global f = msh.faces\n\n    k1 = [velocity(t,pos) for pos in v]\n    v1 = v .+ k1 .* Δt\n    k2 = [velocity(t+Δt/2,pos) for pos in v1]\n\n    v2 = v .+ k2 .* Δt\n\n    mshn = HomogenousMesh(v2,f)\n    global msh = stabilize(mshn,par)\n\n    push!(x,msh)\n\n    AbstractPlotting.force_update!()","category":"page"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"sleep(Δt)","category":"page"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"    global t+=Δt\nend","category":"page"},{"location":"enright/#","page":"Introduction","title":"Introduction","text":"(Image: )","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"EditURL = \"https://github.com/akels/ElTopo.jl/blob/master/examples/index.jl\"","category":"page"},{"location":"#Introduction-1","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"ElTopo.jl is a simple wrapper package for a C++ library eltopo which is built with ElTopoBuilder. At the moment only Linux platform is supported, but since BinaryBuilder is being used and the library has instructions for it to be compiled on other architectures, it should not take much effort for adding support for other platforms. (Ofcourse, in a world where Cxx is a registred package ;)","category":"page"},{"location":"#The-API-1","page":"Introduction","title":"The API","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"As explained in the main repository:","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"El Topo is a free C++ package for tracking dynamic surfaces represented as triangle meshes in 3D. It robustly handles topology changes such as merging and pinching off, while adaptively maintaining a tangle-free, high-quality triangulation.","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"There are three important functions in the ElTopo library SurfTrack::improve_mesh, SurfTrack::topology_changes and SurfTrack::integrate. The first two methods are combined under the name stabilize whereas latter one, which modifies tangential velocities to avoid vertex collisions, is not wrapped.","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"using ElTopo","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"The first step is to initialize the parameters","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"SurfTrack","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"scale = 0.2\npar = SurfTrack(\n    min_edge_length = 0.7*scale,\n    max_edge_length = 1.5*scale,\n    max_volume_change = 0.1*scale^3,\n    merge_proximity_epsilon = 0.5*scale,\n)","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"To execute one first defines a mesh","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"include(\"sphere.jl\")\nmsh = unitsphere(2)","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"And then executes the stabilization algorithm","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"    stabilize","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"newmsh = stabilize(msh,par)","category":"page"}]
}
