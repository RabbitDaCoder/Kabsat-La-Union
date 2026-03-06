import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Percent,
  Upload,
  Link,
  X,
  Image,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminRoomService } from "@/services";
import { formatCurrency, cn } from "@/lib/utils";

/**
 * ImageUploader Component
 * Handles drag & drop, file browse, and URL paste for images
 */
function ImageUploader({
  existingImages = [],
  onExistingImagesChange,
  newFiles = [],
  onNewFilesChange,
  pastedUrls = [],
  onPastedUrlsChange,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (files.length > 0) {
        onNewFilesChange([...newFiles, ...files]);
      }
    },
    [newFiles, onNewFilesChange],
  );

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (files.length > 0) {
      onNewFilesChange([...newFiles, ...files]);
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;

    try {
      new URL(urlInput);
      onPastedUrlsChange([...pastedUrls, urlInput.trim()]);
      setUrlInput("");
    } catch {
      toast.error("Please enter a valid URL");
    }
  };

  const removeExistingImage = (index) => {
    const updated = existingImages.filter((_, i) => i !== index);
    onExistingImagesChange(updated);
  };

  const removeNewFile = (index) => {
    const updated = newFiles.filter((_, i) => i !== index);
    onNewFilesChange(updated);
  };

  const removePastedUrl = (index) => {
    const updated = pastedUrls.filter((_, i) => i !== index);
    onPastedUrlsChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragging
            ? "border-ocean-500 bg-ocean-50"
            : "border-ocean-200 hover:border-ocean-300",
        )}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-ocean-400" />
        <p className="text-sm text-ocean-600 mb-2">
          Drag & drop images here, or{" "}
          <label className="text-ocean-700 font-medium cursor-pointer hover:underline">
            browse
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-xs text-ocean-400">
          JPEG, PNG, GIF, WebP up to 5MB each
        </p>
      </div>

      {/* URL Input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ocean-400" />
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddUrl()}
            placeholder="Paste image URL..."
            className="pl-9"
          />
        </div>
        <Button type="button" onClick={handleAddUrl} variant="outline">
          Add URL
        </Button>
      </div>

      {/* Image Preview Grid */}
      {(existingImages.length > 0 ||
        newFiles.length > 0 ||
        pastedUrls.length > 0) && (
        <div className="space-y-2">
          <Label>
            Images (
            {existingImages.length + newFiles.length + pastedUrls.length})
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {/* Existing Images */}
            {existingImages.map((url, index) => (
              <div key={`existing-${index}`} className="relative group">
                <img
                  src={url}
                  alt={`Existing ${index + 1}`}
                  className="w-full h-20 object-cover rounded border"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=Error";
                  }}
                />
                <Badge className="absolute top-1 left-1 text-xs px-1 py-0">
                  Current
                </Badge>
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {/* New Files */}
            {newFiles.map((file, index) => (
              <div key={`new-${index}`} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`New ${index + 1}`}
                  className="w-full h-20 object-cover rounded border border-green-300"
                />
                <Badge className="absolute top-1 left-1 text-xs px-1 py-0 bg-green-500">
                  New
                </Badge>
                <button
                  type="button"
                  onClick={() => removeNewFile(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {/* Pasted URLs */}
            {pastedUrls.map((url, index) => (
              <div key={`url-${index}`} className="relative group">
                <img
                  src={url}
                  alt={`URL ${index + 1}`}
                  className="w-full h-20 object-cover rounded border border-blue-300"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150?text=Invalid";
                  }}
                />
                <Badge className="absolute top-1 left-1 text-xs px-1 py-0 bg-blue-500">
                  URL
                </Badge>
                <button
                  type="button"
                  onClick={() => removePastedUrl(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Admin Rooms Management page
 */
export function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRoom, setEditRoom] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [discountRoom, setDiscountRoom] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    category: "standard",
    price: "",
    totalRooms: "1",
    maxGuests: "2",
    includedGuests: "2",
    extraGuestPrice: "0",
    amenities: "",
  });
  const [editExistingImages, setEditExistingImages] = useState([]);
  const [editNewFiles, setEditNewFiles] = useState([]);
  const [editPastedUrls, setEditPastedUrls] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [discountData, setDiscountData] = useState({
    isActive: false,
    percentage: 0,
    startDate: "",
    endDate: "",
  });

  // Add room state
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    category: "standard",
    price: "",
    totalRooms: "1",
    maxGuests: "2",
    includedGuests: "2",
    extraGuestPrice: "0",
    amenities: "",
  });
  const [newRoomFiles, setNewRoomFiles] = useState([]);
  const [newRoomUrls, setNewRoomUrls] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await adminRoomService.getRooms();
      setRooms(response.data || []);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      toast.error("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    if (!newRoom.name || !newRoom.price || !newRoom.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (newRoomFiles.length === 0 && newRoomUrls.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsCreating(true);
    try {
      const roomData = {
        name: newRoom.name,
        description: newRoom.description,
        category: newRoom.category,
        price: parseFloat(newRoom.price),
        basePrice: parseFloat(newRoom.price),
        totalRooms: parseInt(newRoom.totalRooms) || 1,
        maxGuests: parseInt(newRoom.maxGuests) || 2,
        includedGuests: parseInt(newRoom.includedGuests) || 2,
        extraGuestPrice: parseFloat(newRoom.extraGuestPrice) || 0,
        amenities: newRoom.amenities
          ? newRoom.amenities
              .split(",")
              .map((a) => a.trim())
              .filter(Boolean)
          : [],
      };

      await adminRoomService.createRoom(roomData, newRoomFiles, newRoomUrls);
      toast.success("Room created successfully");
      fetchRooms();
      setShowAddDialog(false);
      resetNewRoomForm();
    } catch (error) {
      console.error("Failed to create room:", error);
      toast.error(error.message || "Failed to create room");
    } finally {
      setIsCreating(false);
    }
  };

  const resetNewRoomForm = () => {
    setNewRoom({
      name: "",
      description: "",
      category: "standard",
      price: "",
      totalRooms: "1",
      maxGuests: "2",
      includedGuests: "2",
      extraGuestPrice: "0",
      amenities: "",
    });
    setNewRoomFiles([]);
    setNewRoomUrls([]);
  };

  const handleDeleteRoom = async (roomId) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      await adminRoomService.deleteRoom(roomId);
      toast.success("Room deleted successfully");
      fetchRooms();
    } catch {
      toast.error("Failed to delete room");
    }
  };

  const handleEditRoom = async () => {
    if (
      !editRoom ||
      !editData.name ||
      !editData.price ||
      !editData.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const totalImages =
      editExistingImages.length + editNewFiles.length + editPastedUrls.length;
    if (totalImages === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsUpdating(true);
    try {
      const roomData = {
        name: editData.name,
        description: editData.description,
        category: editData.category,
        price: parseFloat(editData.price),
        basePrice: parseFloat(editData.price),
        totalRooms: parseInt(editData.totalRooms) || 1,
        maxGuests: parseInt(editData.maxGuests) || 2,
        includedGuests: parseInt(editData.includedGuests) || 2,
        extraGuestPrice: parseFloat(editData.extraGuestPrice) || 0,
        amenities: editData.amenities
          ? editData.amenities
              .split(",")
              .map((a) => a.trim())
              .filter(Boolean)
          : [],
      };

      // Combine existing images with new pasted URLs
      const allImageUrls = [...editExistingImages, ...editPastedUrls];

      await adminRoomService.updateRoom(
        editRoom._id,
        roomData,
        editNewFiles,
        allImageUrls,
        false, // Replace all images
      );

      toast.success("Room updated successfully");
      fetchRooms();
      setShowEditDialog(false);
      setEditRoom(null);
    } catch (error) {
      console.error("Failed to update room:", error);
      toast.error(error.message || "Failed to update room");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleDiscount = async () => {
    if (!discountRoom) return;

    try {
      await adminRoomService.toggleDiscount(discountRoom._id, {
        isActive: discountData.isActive,
        percentage: parseFloat(discountData.percentage),
        startDate: discountData.startDate,
        endDate: discountData.endDate,
      });
      toast.success("Discount updated successfully");
      fetchRooms();
      setDiscountRoom(null);
    } catch {
      toast.error("Failed to update discount");
    }
  };

  const openEditDialog = (room) => {
    setEditRoom(room);
    setEditData({
      name: room.name || "",
      description: room.description || "",
      category: room.category || "standard",
      price: room.price?.toString() || "",
      totalRooms: room.totalRooms?.toString() || "1",
      maxGuests: room.maxGuests?.toString() || "2",
      includedGuests: room.includedGuests?.toString() || "2",
      extraGuestPrice: room.extraGuestPrice?.toString() || "0",
      amenities: room.amenities?.join(", ") || "",
    });
    setEditExistingImages(room.images || []);
    setEditNewFiles([]);
    setEditPastedUrls([]);
    setShowEditDialog(true);
  };

  const openDiscountDialog = (room) => {
    setDiscountRoom(room);
    setDiscountData({
      isActive: room.seasonalDiscount?.isActive || false,
      percentage: room.seasonalDiscount?.percentage || 0,
      startDate: room.seasonalDiscount?.startDate?.split("T")[0] || "",
      endDate: room.seasonalDiscount?.endDate?.split("T")[0] || "",
    });
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-ocean-950 mb-2">
            Rooms Management
          </h1>
          <p className="text-ocean-600">Manage room pricing and discounts</p>
        </div>
        <Dialog
          open={showAddDialog}
          onOpenChange={(open) => {
            setShowAddDialog(open);
            if (!open) resetNewRoomForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Create a new accommodation for guests
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="room-name">Room Name *</Label>
                  <Input
                    id="room-name"
                    value={newRoom.name}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, name: e.target.value })
                    }
                    placeholder="e.g., Ocean View Deluxe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-category">Category *</Label>
                  <Select
                    value={newRoom.category}
                    onValueChange={(value) =>
                      setNewRoom({ ...newRoom, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="bungalow">Bungalow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-description">Description *</Label>
                <textarea
                  id="room-description"
                  value={newRoom.description}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Describe the room..."
                  className="flex w-full rounded-md border border-ocean-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-ocean-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="room-price">Price per Night (USD) *</Label>
                  <Input
                    id="room-price"
                    type="number"
                    value={newRoom.price}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, price: e.target.value })
                    }
                    placeholder="850"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-total">Total Rooms</Label>
                  <Input
                    id="room-total"
                    type="number"
                    value={newRoom.totalRooms}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, totalRooms: e.target.value })
                    }
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-guests">Max Guests</Label>
                  <Input
                    id="room-guests"
                    type="number"
                    value={newRoom.maxGuests}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, maxGuests: e.target.value })
                    }
                    placeholder="2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="room-included">Included Guests</Label>
                  <Input
                    id="room-included"
                    type="number"
                    value={newRoom.includedGuests}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, includedGuests: e.target.value })
                    }
                    placeholder="2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-extra">Extra Guest Price</Label>
                  <Input
                    id="room-extra"
                    type="number"
                    value={newRoom.extraGuestPrice}
                    onChange={(e) =>
                      setNewRoom({
                        ...newRoom,
                        extraGuestPrice: e.target.value,
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Room Images *
                </Label>
                <ImageUploader
                  existingImages={[]}
                  onExistingImagesChange={() => {}}
                  newFiles={newRoomFiles}
                  onNewFilesChange={setNewRoomFiles}
                  pastedUrls={newRoomUrls}
                  onPastedUrlsChange={setNewRoomUrls}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="room-amenities">
                  Amenities (comma separated)
                </Label>
                <Input
                  id="room-amenities"
                  value={newRoom.amenities}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, amenities: e.target.value })
                  }
                  placeholder="Private Pool, Ocean View, King Bed, Mini Bar"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRoom} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Room"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Room Dialog */}
      <Dialog
        open={showEditDialog}
        onOpenChange={(open) => {
          setShowEditDialog(open);
          if (!open) setEditRoom(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Room - {editRoom?.name}</DialogTitle>
            <DialogDescription>
              Update room details, pricing, and images
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-room-name">Room Name *</Label>
                <Input
                  id="edit-room-name"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  placeholder="e.g., Ocean View Deluxe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-room-category">Category *</Label>
                <Select
                  value={editData.category}
                  onValueChange={(value) =>
                    setEditData({ ...editData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="bungalow">Bungalow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-room-description">Description *</Label>
              <textarea
                id="edit-room-description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                rows={3}
                placeholder="Describe the room..."
                className="flex w-full rounded-md border border-ocean-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-ocean-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-room-price">Price per Night (USD) *</Label>
                <Input
                  id="edit-room-price"
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  placeholder="850"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-room-total">Total Rooms</Label>
                <Input
                  id="edit-room-total"
                  type="number"
                  value={editData.totalRooms}
                  onChange={(e) =>
                    setEditData({ ...editData, totalRooms: e.target.value })
                  }
                  placeholder="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-room-guests">Max Guests</Label>
                <Input
                  id="edit-room-guests"
                  type="number"
                  value={editData.maxGuests}
                  onChange={(e) =>
                    setEditData({ ...editData, maxGuests: e.target.value })
                  }
                  placeholder="2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-room-included">Included Guests</Label>
                <Input
                  id="edit-room-included"
                  type="number"
                  value={editData.includedGuests}
                  onChange={(e) =>
                    setEditData({ ...editData, includedGuests: e.target.value })
                  }
                  placeholder="2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-room-extra">Extra Guest Price</Label>
                <Input
                  id="edit-room-extra"
                  type="number"
                  value={editData.extraGuestPrice}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      extraGuestPrice: e.target.value,
                    })
                  }
                  placeholder="0"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Room Images *
              </Label>
              <ImageUploader
                existingImages={editExistingImages}
                onExistingImagesChange={setEditExistingImages}
                newFiles={editNewFiles}
                onNewFilesChange={setEditNewFiles}
                pastedUrls={editPastedUrls}
                onPastedUrlsChange={setEditPastedUrls}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-room-amenities">
                Amenities (comma separated)
              </Label>
              <Input
                id="edit-room-amenities"
                value={editData.amenities}
                onChange={(e) =>
                  setEditData({ ...editData, amenities: e.target.value })
                }
                placeholder="Private Pool, Ocean View, King Bed, Mini Bar"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false);
                setEditRoom(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEditRoom} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-950 mx-auto" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price/Night</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            room.images?.[0] ||
                            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100"
                          }
                          alt={room.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <span className="font-medium">{room.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {room.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {room.hasActiveDiscount ? (
                        <div>
                          <span className="line-through text-ocean-400 mr-2">
                            {formatCurrency(room.price)}
                          </span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(room.effectivePrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium">
                          {formatCurrency(room.price)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{room.maxGuests} guests</TableCell>
                    <TableCell>
                      {room.seasonalDiscount?.isActive ? (
                        <Badge variant="success">
                          {room.seasonalDiscount.percentage}% off
                        </Badge>
                      ) : (
                        <Badge variant="outline">None</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={room.isActive ? "default" : "destructive"}
                      >
                        {room.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(room)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Dialog
                          open={discountRoom?._id === room._id}
                          onOpenChange={(open) =>
                            !open && setDiscountRoom(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDiscountDialog(room)}
                            >
                              <Percent className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Seasonal Discount - {discountRoom?.name}
                              </DialogTitle>
                              <DialogDescription>
                                Configure seasonal pricing discount
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id="discountActive"
                                  checked={discountData.isActive}
                                  onChange={(e) =>
                                    setDiscountData({
                                      ...discountData,
                                      isActive: e.target.checked,
                                    })
                                  }
                                  className="rounded"
                                />
                                <Label htmlFor="discountActive">
                                  Enable Discount
                                </Label>
                              </div>
                              <div>
                                <Label htmlFor="percentage">
                                  Discount Percentage
                                </Label>
                                <Input
                                  id="percentage"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={discountData.percentage}
                                  onChange={(e) =>
                                    setDiscountData({
                                      ...discountData,
                                      percentage: e.target.value,
                                    })
                                  }
                                  className="mt-2"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="startDate">Start Date</Label>
                                  <Input
                                    id="startDate"
                                    type="date"
                                    value={discountData.startDate}
                                    onChange={(e) =>
                                      setDiscountData({
                                        ...discountData,
                                        startDate: e.target.value,
                                      })
                                    }
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="endDate">End Date</Label>
                                  <Input
                                    id="endDate"
                                    type="date"
                                    value={discountData.endDate}
                                    onChange={(e) =>
                                      setDiscountData({
                                        ...discountData,
                                        endDate: e.target.value,
                                      })
                                    }
                                    className="mt-2"
                                  />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleToggleDiscount}>
                                Save Discount
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteRoom(room._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminRoomsPage;
