"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  Clock,
  Truck,
  Minus,
  Plus,
  Check,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductCard } from "@/components/domain/ProductCard";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const productId = params.id as string;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionCategory, setQuestionCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const product = products.find((p) => p.id === productId);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== productId)
    .slice(0, 6);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      
      // Show success toast
      toast.success(
        `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`,
        {
          description: `₹${(product.price * quantity).toLocaleString()} • ${product.category}`,
          action: {
            label: "View Cart",
            onClick: () => {
              openCart();
            },
          },
        }
      );
      
      setQuantity(1);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const questionCategories = [
    "General Information",
    "Pricing & Packages",
    "Service Availability",
    "Customization Options",
    "Technical Details",
    "Booking & Scheduling",
    "Cancellation & Refund",
    "Other"
  ];

  const handleSubmitQuestion = () => {
    const finalCategory = questionCategory === "Other" ? customCategory : questionCategory;
    
    // Here you would typically submit to an API
    console.log({
      category: finalCategory,
      question: question,
      additionalInfo: additionalInfo,
      productId: productId,
      productName: product?.name
    });

    // Reset form and close modal
    setQuestionCategory("");
    setCustomCategory("");
    setQuestion("");
    setAdditionalInfo("");
    setIsQuestionModalOpen(false);
    
    // Show success toast
    toast.success("Question submitted successfully!", {
      description: "We'll get back to you soon with an answer.",
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
  };

  const isFormValid = () => {
    const hasCategory = questionCategory && (questionCategory !== "Other" || customCategory.trim());
    const hasQuestion = question.trim();
    return hasCategory && hasQuestion;
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "specifications", label: "Specifications" },
    { id: "included", label: "What's Included" },
    { id: "qa", label: "Q&A" },
    { id: "reviews", label: "Reviews" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">About this service</h3>
              <p className="text-muted-foreground leading-relaxed">
                Transform your special occasion with our premium event decoration service. 
                Our expert team specializes in creating magical atmospheres that perfectly 
                capture the essence of your celebration. From elegant wedding setups to 
                vibrant birthday parties, we bring your vision to life with attention to 
                every detail.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Key Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blinkit-green mt-0.5 flex-shrink-0" />
                  <span>Professional design consultation and planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blinkit-green mt-0.5 flex-shrink-0" />
                  <span>High-quality decorative materials and props</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blinkit-green mt-0.5 flex-shrink-0" />
                  <span>Complete setup and breakdown service</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blinkit-green mt-0.5 flex-shrink-0" />
                  <span>Customizable themes and color schemes</span>
                </li>
              </ul>
            </div>
          </div>
        );
      case "specifications":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Service Type</h4>
                <p className="text-muted-foreground">Complete Event Decoration</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Duration</h4>
                <p className="text-muted-foreground">4-8 hours setup</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Team Size</h4>
                <p className="text-muted-foreground">3-5 professionals</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Coverage Area</h4>
                <p className="text-muted-foreground">Up to 2000 sq ft</p>
              </div>
            </div>
          </div>
        );
      case "included":
        return (
          <div className="space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blinkit-green mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Free consultation and quote</span>
                  <p className="text-sm text-muted-foreground">Initial planning session with our design expert</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blinkit-green mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Same-day response guarantee</span>
                  <p className="text-sm text-muted-foreground">Quick turnaround on all inquiries and bookings</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blinkit-green mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Professional setup & breakdown</span>
                  <p className="text-sm text-muted-foreground">Complete installation and cleanup service</p>
                </div>
              </li>
            </ul>
          </div>
        );
      case "qa":
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Have Questions?</h3>
              <p className="text-muted-foreground mb-4">Contact us for detailed information about this service.</p>
              <Sheet open={isQuestionModalOpen} onOpenChange={setIsQuestionModalOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 border-border hover:bg-muted">
                    <MessageCircle className="w-4 h-4" />
                    Ask a Question
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
                  {/* Header */}
                  <SheetHeader className="pb-6 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <SheetTitle className="text-xl font-semibold text-foreground">Ask a Question</SheetTitle>
                        <p className="text-sm text-muted-foreground mt-1">We&apos;re here to help! Let us know what you&apos;d like to know about this service.</p>
                      </div>
                    </div>
                  </SheetHeader>
                  
                  <div className="space-y-6 px-6">
                    {/* Question Category */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                        Question Type 
                        <span className="text-destructive">*</span>
                      </label>
                      <Select value={questionCategory} onValueChange={setQuestionCategory}>
                        <SelectTrigger className="w-full bg-background border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm h-12">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {questionCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Custom Category Input */}
                    {questionCategory === "Other" && (
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                          Custom Category 
                          <span className="text-destructive">*</span>
                        </label>
                        <Input
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          placeholder="Please specify your category"
                          className="bg-background border-border rounded-xl focus:ring-primary focus:border-transparent transition-all duration-200 text-sm p-3"
                        />
                      </div>
                    )}

                    {/* Question */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                        Your Question 
                        <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          value={question}
                          onChange={(e) => {
                            if (e.target.value.length <= 500) {
                              setQuestion(e.target.value);
                            }
                          }}
                          placeholder="What would you like to know about this service?"
                          rows={4}
                          className="w-full p-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 text-sm"
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                          {question.length}/500
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground">
                        Is anything else you&apos;d like us to know?
                      </label>
                      <textarea
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder="Any additional details, special requirements, or context..."
                        rows={3}
                        className="w-full p-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 text-sm"
                      />
                    </div>

                    {/* Product Context Card */}
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-xl border border-primary/10">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-background rounded-lg overflow-hidden flex-shrink-0 border border-border">
                          {product?.image && (
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-foreground mb-1">Asking about:</h4>
                          <p className="text-sm text-foreground font-medium">{product?.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {product?.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              ₹{product?.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button
                        onClick={handleSubmitQuestion}
                        disabled={!isFormValid()}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        Submit Question
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsQuestionModalOpen(false)}
                        className="border-border hover:bg-muted h-11 rounded-xl px-6 transition-all duration-200"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-6 h-6 fill-blinkit-yellow text-blinkit-yellow" />
                <span className="text-2xl font-bold text-foreground">4.9</span>
              </div>
              <div className="text-muted-foreground">
                <span className="font-medium">(42 reviews)</span>
                <span className="block text-sm">• Available for booking</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-b border-border pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-blinkit-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">Priya S.</span>
                  <span className="text-sm text-muted-foreground">2 weeks ago</span>
                </div>
                <p className="text-foreground">Amazing decoration service! The team was professional and the setup was exactly as promised. Highly recommended for weddings.</p>
              </div>
              <div className="border-b border-border pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-blinkit-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">Rajesh M.</span>
                  <span className="text-sm text-muted-foreground">1 month ago</span>
                </div>
                <p className="text-foreground">Perfect for our anniversary celebration. Beautiful decorations and great attention to detail. Will book again!</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!product) {
    return (
      <PageContainer>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <PageContainer>
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 overflow-hidden">
        {/* Breadcrumb */}
        <CustomBreadcrumb
          items={[
            {
              label: product.category,
              href: `/category/${product.category
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/&/g, "and")}`,
            },
            { label: product.name },
          ]}
          className="mb-4 sm:mb-6"
        />

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 sm:mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Product Images - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image - Better aspect ratio */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.discount && (
                <Badge className="absolute top-3 left-3 bg-destructive hover:bg-destructive/90 text-xs">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors",
                    selectedImage === index 
                      ? "border-primary" 
                      : "border-border hover:border-muted-foreground"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                {product.category}
              </Badge>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-blinkit-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < 4 ? "fill-current" : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-sm text-foreground">
                    {product.rating}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    ({product.reviewCount || 42} reviews)
                  </span>
                </div>
                <span className="text-blinkit-green text-sm">
                  • Available for booking
                </span>
              </div>
            </div>

            {/* Price - More prominent */}
            <div className="rounded-xl border border-border bg-card shadow-sm px-4 py-3 sm:px-6 sm:py-4 inline-flex flex-col max-w-md">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-foreground">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                {product.discount && (
                  <Badge className="bg-blinkit-green text-primary-foreground text-xs font-medium">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span>Inclusive of all taxes</span>
                {product.originalPrice && (
                  <span className="text-blinkit-green font-medium">
                    You save ₹
                    {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-accent/50 text-accent-foreground border-accent"
              >
                Romantic
              </Badge>
              <Badge
                variant="outline"
                className="bg-blinkit-orange/10 text-blinkit-orange border-blinkit-orange/30"
              >
                Candles
              </Badge>
              <Badge
                variant="outline"
                className="bg-blinkit-red/10 text-blinkit-red border-blinkit-red/30"
              >
                Roses
              </Badge>
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-blinkit-green" />
                <span className="text-foreground">
                  Free consultation and quote
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blinkit-orange" />
                <span className="text-foreground">
                  Same-day response guarantee
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-4 h-4 text-blinkit-green" />
                <span className="text-foreground">
                  Professional setup & breakdown
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <span className="font-medium text-foreground">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-8 h-8 p-0 border-border hover:bg-muted"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementQuantity}
                    className="w-8 h-8 p-0 border-border hover:bg-muted"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-base py-3 rounded-xl"
                  size="lg"
                >
                  Book Now - ₹{(product.price * quantity).toLocaleString()}
                </Button>

                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="px-4 py-3 rounded-xl border-2 border-border hover:bg-muted"
                  size="lg"
                >
                  Add to cart
                </Button>
              </div>

              <Button 
                variant="ghost" 
                className="w-full text-primary hover:text-primary/80 hover:bg-primary/5 rounded-xl py-3"
                size="lg"
              >
                View Gallery
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8 lg:mb-12">
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-shrink-0 px-4 sm:px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {renderTabContent()}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Related Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageContainer>
  );
}
